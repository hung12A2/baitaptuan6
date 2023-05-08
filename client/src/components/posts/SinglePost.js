import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ActionButton from './ActionButton'


const SinglePost = ({ post: { _id, status, title, description, url } }) => (
	<Card
		className='shadow'
		border={
			status === 'LEARNED'
				? 'success'
				: status === 'LEARNING'
				? 'warning'
				: 'danger'
		}
	>
		<Card.Body>
			<Card.Title>
				<Row>
					<Col>
						<p className='post-title'>{title}</p>
					</Col>
					<Col className='text-right'>
						<ActionButton url={url} _id={_id} />
					</Col>
				</Row>
				<Row>
					<img src={url} className='anh'></img>
				</Row>
			</Card.Title>
			<Card.Text>{description}</Card.Text>
		</Card.Body>
	</Card>
)

export default SinglePost
