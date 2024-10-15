import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Tarjeta.css'

function Tarjeta({datos}) {
  return (
    <Card style={{ width: '18rem',backgroundColor:datos.fondo }} className='tarjeta-homepage'>
      <Card.Img variant="top" src={datos.img}  />
      <Card.Body>
        <Card.Title>{datos.titulo}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">{datos.boton}</Button>
      </Card.Body>
    </Card>
  );
}

export default Tarjeta;