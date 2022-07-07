import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import styles from "../../styles/Music.module.css"
import Modal from "../../components/Modal"

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "11f83973f4msh71b29aa939e03e2p1f740cjsnc5371152b08e",
		"X-RapidAPI-Host": "spotify23.p.rapidapi.com",
	},
}

export default function Music() {
	const router = useRouter()
	const id = router.query.id
	const [name, setName] = useState("Titulo")
	const [author, setAuthor] = useState("Autor")
	const [duration, setDuration] = useState("0:00")
	const [cover, setCover] = useState(
		"https://p2.trrsf.com/image/fget/cf/1200/900/middle/images.terra.com/2021/12/22/1779450933-the-weeknd-umg-republic-5.jpg"
	)
	const [preview, setPreview] = useState("")

	useEffect(() => {
		fetch(
			`https://spotify23.p.rapidapi.com/search/?q=${id}&type=tracks&limit=1`,
			options
		)
			.then((response) => response.json())
			.then((response) => {
				console.log(response)
				setName(response.tracks.items[0].data.name)
				setAuthor(
					response.tracks.items[0].data.artists.items[0].profile.name
				)
				setDuration(
					msToTime(
						response.tracks.items[0].data.duration.totalMilliseconds
					)
				)

				setTimeout(() => {
					fetch(
						`https://spotify23.p.rapidapi.com/tracks/?ids=${response.tracks.items[0].data.id}`,
						options
					)
						.then((response) => response.json())
						.then((response) => {
							console.log(response)
							setPreview(response.tracks[0].preview_url)
							setCover(response.tracks[0].album.images[0].url)
						})
						.catch((err) => console.error(err))
				}, 1000)
			})
			.catch((err) => console.error(err))
	})

	return (
		<div className={styles.wrapper}>
			<Modal
				name={name}
				author={author}
				duration={duration}
				cover={cover}
				preview={preview}
			></Modal>
		</div>
	)
}

function msToTime(ms) {
	var seconds = Math.floor(ms / 1000)
	var minutes = Math.floor(seconds / 60)
	var hours = Math.floor(minutes / 60)
	var time = ""
	if (hours > 0) {
		time += hours + ":"
	}
	time += (minutes % 60) + ":"
	time += seconds % 60
	return time
}
