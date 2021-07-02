import React from 'react';
import { Card } from 'antd';
import '../styles.css';
import ModalWindow from './modal'

const { Meta } = Card;

class Pokemon extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    pokemon: null,
    isModalVisible: false
  }

  componentDidMount() {
    fetch(this.props.url)
      .then( res => res.json() )
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            pokemon: result,
          }); 
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  onCloseModal = () => {
    this.setState({ isModalVisible: false })
  }

  render () {
    const { error, isLoaded, pokemon } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          <Card
            hoverable
            style = {{ width: 180, padding: 5, margin: 10 }}
            cover={<img className="pokemon_img" alt="img" 
            src={pokemon.sprites.front_default} />}
            onClick = { () => this.setState({isModalVisible: true}) }
          >
            <Meta title={pokemon.name[0].toUpperCase() + pokemon.name.slice(1)} />
          </Card>
          <ModalWindow 
            onCloseModal={this.onCloseModal}
            isModalVisible={this.state.isModalVisible}
            pokemon={this.state.pokemon}
          />
        </>
      )
    }
  }
}
export default Pokemon;