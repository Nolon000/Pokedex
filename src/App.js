import React from 'react';
import List from './components/list';
import { Layout, Pagination } from 'antd';
import './styles.css';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      carentPage: 1,
      pageSize: 10,
      total: 918,
    }
  };

  onSizeChange = (current, pageSize) => {
    this.setState({
      carentPage: current,
      pageSize: pageSize
    })
  };

  setTotal = (total) => {
    this.setState({ total })
  }

  setCurrentPage = (carentPage) => {
    this.setState({ carentPage })
  }

  render() {
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1000, width: '100%', fontSize: 35}}>
          <div className="logo" >Pokedex</div>
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-background" id="app"  style={{ padding: 24, minHeight: 380 }}>
          <List 
            currentPage={this.state.carentPage}
            pageSize={this.state.pageSize}
            setTotal={this.setTotal}
            setCurrentPage={this.setCurrentPage}
          />
          <Pagination
            defaultCurrent={1}
            current={this.state.carentPage}
            pageSize={this.state.pageSize}
            showSizeChanger
            onChange={this.onSizeChange}
            total={this.state.total}
          />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Made by Andrew Bezprizvanyi</Footer>
      </Layout>
    )
  }
}

export default App;
