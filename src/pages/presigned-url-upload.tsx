import { GraphQLResult } from "@aws-amplify/api-graphql"
import { Button, CircularProgress, Stack } from "@mui/material"
import Container from "@mui/material/Container"
import { CreateUploadPresignedUrlMutation } from "API"
import { API, graphqlOperation } from "aws-amplify"
import axios from "axios"
import { createUploadPresignedUrl } from "graphql/mutations"
import { NextPage } from "next"
import React, { useState } from "react"
import { useAsyncCallback } from "react-async-hook"

const Page: NextPage = () => {
  const [file, setFile] = useState<File>()
  const [_success, setSuccess] = useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const uploadFile = async (file: File) => {
    if (!file) return
    try {
      const ret = (await API.graphql(
        graphqlOperation(createUploadPresignedUrl, {
          filename: file.name,
        }),
      )) as GraphQLResult<CreateUploadPresignedUrlMutation>

      console.log(ret)

      if (ret.data?.createUploadPresignedUrl?.presignedUrl) {
        console.log("upload")
        await axios.put(ret.data.createUploadPresignedUrl.presignedUrl, file, {})
      }
    } catch (error) {
      console.log(error)
    }

    setFile(undefined)
    if (!!inputRef?.current) {
      inputRef.current.value = ""
    }
    setSuccess(true)
  }

  const onFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!!event.target.files) {
      const file = event.target.files[0]
      setFile(file)
    }
  }

  const clickFileUploadButton = async () => {
    if (!!file) {
      await uploadFile(file)
    }
  }

  const asyncEvent = useAsyncCallback(clickFileUploadButton)

  return (
    <Container maxWidth={"md"} sx={{ py: 3, height: "100vh" }}>
      <Stack direction={"column"} spacing={2} alignItems={"center"}>
        <input name={"file"} ref={inputRef} type={"file"} onChange={onFileInputChange} />
        <Button
          variant={"contained"}
          disabled={!file || asyncEvent.loading}
          onClick={asyncEvent.execute}
          sx={{ width: "200px" }}
        >
          {asyncEvent.loading ? <CircularProgress size={25} /> : "ファイルアップロード"}
        </Button>
      </Stack>
    </Container>
  )
}

export default Page
