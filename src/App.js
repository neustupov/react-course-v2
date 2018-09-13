import React from 'react';
import './App.css';
import {Add} from "./components/Add";
import {News} from "./components/News";

class App extends React.Component {

    state = {
        news: null,
        isLoading: false
    };

    handleAddNews = data => {
        const nextNews = [data, ...this.state.news];
        this.setState({news: nextNews});
    };

    componentDidMount()
    {
        this.setState({ isLoading: true });
        fetch('http://localhost:3000/data/newsData.json')
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({ isLoading: false, news: data })
            })
    }

    render() {

        const {news, isLoading} = this.state;

        return (
            <React.Fragment>
                <Add onAddNews={this.handleAddNews}/>
                <h3>Новости</h3>
                {isLoading && <p>Загружаю...</p>}
                {Array.isArray(news) && <News data={news}/>}
            </React.Fragment>
        );
    }
}

export default App;
