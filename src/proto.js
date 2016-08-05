import protobuf from "protobufjs";
import path from "path";

export default protobuf.loadProtoFile({ root: path.join(__dirname, "../"), file: "POGOProtos/POGOProtos.proto" }).build("POGOProtos");