import styles from "../styles/Modal.module.css"
import { Icon } from "@iconify/react"

function Modal(props) {
	return (
		<div className={styles.modal}>
			<div className={styles.albumCover}>
				<div className={styles.albumCoverWrapper}>
					<img src={props.cover} alt="Image PlaceHolder" />
				</div>
			</div>
			<div className={styles.content}>
				<h1 className={styles.name}>{props.name}</h1>
				<h2 className={styles.author}>{props.author}</h2>
			</div>
			<div className={styles.timeline}>
				<span>0:00</span>
				<input type="range" />
				<span>{props.duration}</span>
			</div>
			<audio controls>
				<source src={props.preview} type="audio/mpeg" />
			</audio>
			<div className={styles.buttons}>
				<button className={styles.circle}>
					<Icon icon="bx:skip-previous" />
				</button>
				<button className={styles.circleActive}>
					<Icon icon="clarity:play-solid" />
				</button>
				<button className={styles.circle}>
					<Icon icon="bx:skip-next" />
				</button>
			</div>
		</div>
	)
}

export default Modal
