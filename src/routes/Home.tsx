import { useQuery } from "@tanstack/react-query"
import { fetchNowPlayingMovie } from "api"
import styled from "styled-components"

export default function Home (){
    const {data : nowPlayingData, isLoading : nowPlayingLoading} = useQuery(["movies", "nowPlaying"], fetchNowPlayingMovie)
    return <Container>
    </Container>
}
const Container = styled.div`
    background-color: #ffffff;
    height: 200vh;
`