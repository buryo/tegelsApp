import React, { Component } from "react";
import ReactDOM from "react-dom";
import tileStyles from "./TileStyle.css";
import { Modal, Button, Divider, Empty } from "antd";

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import MatButton from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {

    },
    media: {
        minHeight: 140
    }
};

export default class Tile extends Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = e => {
        this.setState({
            visible: false
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false
        });
    };

    truncateString(str, num) {
        if (str) {
            if (str.length > num) {
                return str.slice(0, num) + "...";
            }
            else {
                return str;
            }
        }
    }
    render() {
        return (
            <Card className="col-3 tile-card" style={styles.card}>
                <CardActionArea>
                    <CardMedia
                        image={this.props.photo_url}
                        title="Contemplative Reptile"
                        style={styles.media}
                    />
                    <CardContent style={{ height: 170 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.truncateString(this.props.moduleTitle, 25)}
                        </Typography>
                        <Typography component="p">
                            {this.truncateString(this.props.moduleDescription, 40)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}
