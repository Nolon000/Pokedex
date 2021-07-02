import React from 'react';
import { Modal, Progress, Divider, Row, Col } from 'antd';


class ModalWindow extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
    }
  };
 
  render() {
    const { pokemon } = this.props;

    return (
      <Modal 
        title={`${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}`} 
        visible={this.props.isModalVisible} 
        onCancel={this.props.onCloseModal}
        onClose={this.props.onCloseModal}
        footer={null}
      >
          <Row>  
            <Col span={12}>
              <img className="pokemon_img" alt="img" 
                src={pokemon.sprites.front_default} 
                style={{float: 'left', height: '150px'}}
              />
            </Col> 
            <Col span={12}>
            Id: {pokemon.id} <br/>
            Height: {pokemon.height} <br/>
            Weight: {pokemon.weight} <br/>
            Base experience: {pokemon.base_experience} <br/>
            </Col>
          </Row>  
        <div>
          <Divider>Abilities</Divider>
          {pokemon.abilities.map( (item) => <p>{item.ability.name[0].toUpperCase() + item.ability.name.slice(1)}</p> )}
          <Divider>Stats</Divider>
          {pokemon.stats.map( (item) => 
            <>{item.stat.name[0].toUpperCase() + item.stat.name.slice(1)}
              <Progress 
                status={"normal"}
                percent={item.base_stat} 
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }} 
                format={(percent) => percent }
              /> 
            </>)}
            <Divider>Moves</Divider>
            {pokemon.moves.map( (item) => `${item.move.name[0].toUpperCase() + item.move.name.slice(1)}, ` )}
        </div>
      </Modal>
    );
  }
};


export default ModalWindow;