import fs from "fs";
import Proxy from "http-mitm-proxy";
import DNS from "dns";

import print from "./print";
import CFG from "../cfg";

/**
 * @return {Proxy}
 */
export function createServerProxy() {
    let dnsEntries = this.dns = {
        domains: {},
        ips: {}
    };

    /* Quick DNS lookups */
    ['pgorelease.nianticlabs.com'].map((domain)=> {
        DNS.resolve4(domain, (err, result)=> {
            dnsEntries.domains[domain] = dnsEntries.ips[result[0]] = {domain: domain, ip: result[0]};
        });
    });

    let proxy = new Proxy();
    proxy.use(Proxy.gunzip);
    proxy.use(Proxy.wildcard);

    /* Proxy error handler */
    proxy.onError((ctx, err, errorKind) => {
        // ctx may be null
        if (errorKind !== "PROXY_TO_SERVER_REQUEST_ERROR") {
            var url = (ctx && ctx.clientToProxyRequest) ? ctx.clientToProxyRequest.url : '';
            print(errorKind + ' on ' + url + ':' + err, 31);
        }
    });

    /* IP<->Domain Translation */
    proxy.onConnect((req, socket, head, callback) => {
        var ip;
        if (!req.url.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:443/)) {
            return callback();
        }
        ip = req.url.split(/:/)[0];
        if (dnsEntries.ips[ip]) {
            req.url = dnsEntries.ips[ip].domain + ':443';
        }
        return callback();
    });

    /* Request handler */
    proxy.onRequest((reqCtx, reqCB) => {
        if (dnsEntries.domains[reqCtx.clientToProxyRequest.headers.host] && this.world.isFull()) {
            print(`Server is full! Refused ${reqCtx.clientToProxyRequest.headers.host}`, 31);
            return void 0;
        }
        var chunks = [];
        reqCtx.onRequestData((ctx, chunk, callback)=> {
            if (dnsEntries.domains[ctx.clientToProxyRequest.headers.host]) {
                chunks.push(chunk);
            } else {
                callback();
            }
        });
        reqCtx.onRequestEnd((ctx, callback)=> {
            if (dnsEntries.domains[ctx.clientToProxyRequest.headers.host]) {
                let buffer = Buffer.concat(chunks);
                ctx.clientToProxyRequest.body = buffer;
                this.routeRequest(ctx.clientToProxyRequest, ctx.proxyToClientResponse);
            } else {
                callback();
            }
        });
        return reqCB(); //? Can't recall if i was supposed to disable this
    });

    /* Start server */
    proxy.listen(CFG.PROXY);
    return (proxy);
}

export function shutdownProxy() {
    this.proxy.close(() => {
        print("Closed proxy server!", 33);
        this.closeConnection(() => {
            print("Closed database connection!", 33);
            print("Server shutdown!", 31);
            setTimeout(() => process.exit(1), 2e3);
        });
    });
}

export function processProxyFiles(req, res, route) {
    let item = route[2];
    switch (item) {
        case "pac":
            print(`Sent Proxy PAC file to client`, 36);
            let localIPv4 = this.getLocalIPv4();
            let response = ['function FindProxyForURL(url,host){'];
            response.push("\tif(shExpMatch(host,\"(" + Object.keys(this.dns.domains).join('|') + ")\")){");
            // response.push("\t\treturn \"PROXY " + localIPv4 + ":" + CFG.PROXY.port + "\";");
            response.push("\t\treturn \"PROXY " + (CFG.LOCAL_IP || localIPv4) + ":" + CFG.PROXY.port + "\";");
            response.push("\t} else {");
            response.push("\t\treturn \"DIRECT\";");
            response.push("\t}");
            response.push("}\n");
            res.end(response.join("\n"));
            break;
        case "ca.crt":
        case "ca.der":
        case "ca.pem":
            fs.readFile(CFG.PROXY.sslCaDir + "/certs/ca.pem", (error, data) => {
                if (error) {
                    print(`Error file resolving CA file:` + error, 31);
                    return void 0;
                }
                print(`Sent Proxy Certificate file to client`, 36);
                res.end(data);
            });
            break;
        default:
            res.end("");
            break;
    }

}