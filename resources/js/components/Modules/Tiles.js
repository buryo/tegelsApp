import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Modal, Button, Divider, Spin, Icon } from "antd";
import Tile from "./Tile";
import tileStyles from "./TileStyle.css";
import axios from 'axios'
import { Link } from 'react-router-dom';


export default class Tiles extends Component {
  state = {
    loading: true,
    modules: null,
  }

  componentDidMount() {
    axios.get('/api/modules', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then(response => {
        this.setState({
          modules: response.data.data,
          loading: false,
        });
      });
  }

  render() {
    const { modules } = this.state;

    if (this.state.loading) {
      return (
        <Spin
          style={{ margin: '100px 45%' }}
          size="large"
        />
      )
    } else {
      return (
        <div className="container-fluid p-4">
          <div className="row module-tiles m-0 tiles">
            {modules.map(module =>
              <Link key={module.id} to={'/modules/' + module.id}>
                <Tile
                  key={module.id}
                  moduleTitle={module.title}
                  moduleDescription={module.description}
                  photo_url={"/storage/images/" + module.photo_url}
                />
              </Link>
            )}
          </div>
        </div>
      );
    }
  }
}