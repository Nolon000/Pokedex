import React from 'react';
import 'antd/dist/antd.css';
import Pokemon from './pokemon'; 
import { Row, Col, Input } from 'antd';
import Tags from './tag';

class List extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      error: null,
      isLoaded: false,
      pokemons: [],
      filterPokemons: []
    }
  }

  fetchData = (currentPage = 1, pageSize = 10) => { 
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * pageSize}&limit=${pageSize}`)
      .then(res => res.json())
      .then(
        (result) => {
          if (this.state.searchKey) {
            this.setState({
              isLoaded: true,
              pokemons: result.results,
            }, () => this.onSearch(this.state.searchKey));
          } else {
            this.setState({
              isLoaded: true,
              pokemons: result.results,
            });
            this.props.setTotal(result.count)
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  fetchPokemonsByType = (type) => {
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
    .then(res => res.json())
      .then(
        (result) => {
          if (this.state.searchKey) {
            this.setState({
              pokemonsByType: result.pokemon.map(({ pokemon }) => pokemon),
              pokemonType: type 
            }, () => this.onSearch(this.state.searchKey)); 
          } else {
            this.setState({
              pokemonsByType: result.pokemon.map(({ pokemon }) => pokemon),
              pokemonType: type 
            }); 
            this.props.setTotal(result.pokemon.length)
            this.props.setCurrentPage(1);
          }
        },
      )
  }

  onClosable = () => {
    this.setState({ pokemonType: null, pokemonsByType: null });
    this.fetchData(this.props.currentPage, this.props.pageSize);
  }

  onSearch = (searchKey) => {
    const filterPokemons = this.state[this.state.pokemonType ? 'pokemonsByType' : 'allPokemons'].filter(({ name }) => name.search(searchKey) !== -1)

    this.setState({ filterPokemons, searchKey, pokemons: filterPokemons.slice(0, this.props.pageSize) })
    this.props.setTotal(filterPokemons.length)
    this.props.setCurrentPage(1);
  }

  componentDidMount() {
    this.fetchData(this.props.currentPage, this.props.pageSize);

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10000`)
    .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            allPokemons: result.results,
          }); 
        },
      )
  };

  shouldComponentUpdate(_nextProps, _nextState) {
    const isPaginationChanged = _nextProps.currentPage !== this.props.currentPage || _nextProps.pageSize !== this.props.pageSize;
    if (
      _nextState.pokemonType && 
      (isPaginationChanged || _nextState.pokemonsByType !== this.state.pokemonsByType || _nextState.searchKey !== this.state.searchKey)
    ) {
      this.setState({
        pokemons: (_nextState.searchKey ? _nextState.filterPokemons : _nextState.pokemonsByType)
          .slice((_nextProps.currentPage -1) * _nextProps.pageSize, _nextProps.pageSize * _nextProps.currentPage)
      })
    }
    else if (isPaginationChanged || _nextState.searchKey !== this.state.searchKey) {
      _nextState.searchKey ? 
      this.setState({ pokemons: _nextState.filterPokemons.slice((_nextProps.currentPage -1) * _nextProps.pageSize, _nextProps.pageSize * _nextProps.currentPage) }) :
      this.fetchData(_nextProps.currentPage, _nextProps.pageSize);
    }
    return true;
  };

  render() {
    const { error, isLoaded, pokemons, pokemonType } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
        <Row>
          <Col span={12} offset={6}>
            <Input.Search 
            placeholder="Input search text" 
            onSearch= {this.onSearch} 
            enterButton 
            />
          </Col>
        </Row>
        <Tags onClosable={this.onClosable} fetchPokemonsByType={this.fetchPokemonsByType} pokemonType={pokemonType} />
        <Row>
          {pokemons.map( item => (
            <Col xs={24} sm={8} md={6} lg={6} key={item.name}>
              <Pokemon url={item.url} key={item.url} />
            </Col>
          ))}
        </Row>
        </>
      );
    }
  };
};

export default List;
