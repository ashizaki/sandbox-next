import { Button, List, ListItem, ListItemText, Stack, TextField, Typography } from "@mui/material"
import Container from "@mui/material/Container"
import { NextPage } from "next"
import React, { useState } from "react"
import ReactPlayer from "react-player"
import { OnProgressProps } from "react-player/base"

type Comment = {
  when: number
  comment: string
}

const Page: NextPage = () => {
  const [count, setCount] = useState(0)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const [isPaused, setIsPaused] = useState(true)
  const [comments, setComments] = useState<Comment[]>([])
  const [comment, setComment] = useState("")

  const handleEnd = () => {
    setCount(count + 1)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const handleProgress = (state: OnProgressProps) => {
    console.log(`${state.playedSeconds}/${state.played}`)
    setPlayedSeconds(state.playedSeconds)
  }

  const handleStart = () => {
    setIsPaused(false)
  }

  const handlePause = () => {
    setIsPaused(true)
    console.log(playedSeconds)
  }

  const handleAddComment = () => {
    setComments([...comments, { when: playedSeconds, comment: comment }])
    setComment("")
  }

  return (
    <Container maxWidth={"md"} sx={{ py: 3, height: "100vh" }}>
      <Stack direction={"column"} spacing={2} alignItems={"center"}>
        <Stack direction={"row"} spacing={2}>
          <ReactPlayer
            url={
              "https://d3dpj8r1g96ype.cloudfront.net/2b7a82c8-1a21-41ed-8252-229ea7aac48b/AppleHLS1/CIMG1226452ssa.m3u8"
            }
            controls
            onEnded={handleEnd}
            onPause={handlePause}
            onStart={handleStart}
            onProgress={handleProgress}
            config={{
              file: {
                forceHLS: true,
              },
            }}
          />
          <Stack direction={"column"} sx={{ width: "400px" }}>
            <Stack direction={"row"} spacing={1}>
              <TextField variant={"outlined"} onChange={handleChange} size={"small"} />
              <Button variant={"contained"} onClick={handleAddComment}>
                {"登録"}
              </Button>
            </Stack>
            <List dense>
              {comments.map((c, idx) => (
                <ListItem key={idx} sx={{ py: 2 }}>
                  <ListItemText
                    primary={
                      <Typography sx={{ color: playedSeconds > c.when ? "#f00" : "#ccc" }}>
                        {c.comment}
                      </Typography>
                    }
                    secondary={c.when}
                  />
                </ListItem>
              ))}
            </List>
          </Stack>
        </Stack>
        <Typography variant={"h3"}>{`視聴回数：${count}`}</Typography>
        <Typography variant={"h3"}>
          {isPaused ? `停止中:${playedSeconds}` : `再生中：${playedSeconds}`}
        </Typography>
      </Stack>
    </Container>
  )
}

export default Page
