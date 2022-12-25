import { Container, List, ListItem, ListItemText, Stack } from "@mui/material"
import { NextPage } from "next"
import Link from "next/link"
import { pagesPath } from "lib/$path"

const Page: NextPage = () => {
  return (
    <Container maxWidth={"md"} sx={{ py: 3, height: "100vh" }}>
      <Stack direction={"column"}>
        <List>
          <Link href={pagesPath.presigned_url_upload.$url()} passHref>
            <ListItem sx={{ border: "1px solid #ccc" }}>
              <ListItemText primary={"署名付きURLを使ったファイルのアップロード"} />
            </ListItem>
          </Link>
          <Link href={pagesPath.video_player.$url()} passHref>
            <ListItem sx={{ border: "1px solid #ccc" }}>
              <ListItemText primary={"動画のストリーミング再生"} />
            </ListItem>
          </Link>
        </List>
      </Stack>
    </Container>
  )
}

export default Page
