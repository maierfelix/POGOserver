Imports System.IO

Public Class POGOserver
    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        Dim ID As Integer
        Hide()
        ID = Shell("cmd /c set LIBPROTOBUF=%CD%\protobuf | npm install node-protobuf && npm install && pause", AppWinStyle.NormalFocus, True, -1)
        Show()
    End Sub

    Private Sub Button2_Click(sender As Object, e As EventArgs) Handles Button2.Click
        Dim ID As Integer
        Hide()
        ID = Shell("cmd /c npm run boot", AppWinStyle.NormalFocus, True, -1)
        Show()
    End Sub

    Private Sub Button3_Click(sender As Object, e As EventArgs) Handles Button3.Click
        Dim ID As Integer
        Hide()
        ID = Shell("cmd /c npm run api", AppWinStyle.NormalFocus, True, -1)
        Show()
    End Sub

    Private Sub Button4_Click(sender As Object, e As EventArgs) Handles Button4.Click
        Dim ID As Integer
        Hide()
        ID = Shell("cmd /c npm run update && pause", AppWinStyle.NormalFocus, True, -1)
        Show()
    End Sub

    Private Sub Button5_Click(sender As Object, e As EventArgs) Handles Button5.Click
        End
    End Sub

    Private Sub POGOserver_Shown(sender As Object, e As EventArgs) Handles MyBase.Shown
        If Directory.Exists("..\..\..\node_modules") Then
            Button1.Enabled = False
        End If
    End Sub
End Class
