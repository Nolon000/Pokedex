import { Tag, Divider, Row, Col } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';

class Tags extends React.Component {

  state = {
    isLoaded: false,
    pokemonsTag: []
  }

  fetchTags = () => { 
    fetch(`https://pokeapi.co/api/v2/type`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            pokemonsTag: result.results
          })
        }
      )
  }

  componentDidMount() {
    this.fetchTags();
  }

  render() {
    const { isLoaded, pokemonsTag } = this.state;
    const { fetchPokemonsByType, pokemonType, onClosable } = this.props;
      if (!isLoaded) {
        return <div>Loading...</div>;
    } else {   
      return (
        <>
        <Divider>Tags</Divider>
        <div style = {{margin: 5, display: "flex", justifyContent: "center" }}>
          <Row>
            {pokemonsTag.map(({ name }) => (
              <Col xs={6} sm={4} md={3} lg={2}>
                <Tag.CheckableTag
                  key={name}
                  color="#0d617a" 
                  className="tags-styles" 
                  onChange={() => pokemonType === name ? onClosable() : fetchPokemonsByType(name)}
                  checked={pokemonType === name}
                >
                  {name}
                </Tag.CheckableTag>
              </Col>
            ))}
          </Row>
        </div>
        <Divider />
      </>
      )   
    }
  }
}

export default Tags