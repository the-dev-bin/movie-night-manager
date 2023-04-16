import { Link } from "react-router-dom";



function Home() {
	return <>
		Hello Homepage
		<Link to={`/group/suggest`}>Suggest a Movie</Link>
	</>
}

export default Home;