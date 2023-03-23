import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";

export class App extends Component {
  state = {
    searchNameImages:'',
  //   colectionImages: null,
  //   page: 1,
  }
  
  // componentDidMount() {
  //   
        
  //   try {
  //     const response = await axios.get(`,);
  //     return response.data;

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // }
  
  handleSubmit = colectionNameImages => {
    this.setState({searchNameImages: colectionNameImages})
  }

  // searchColections = async () => {
  //   const colections = await API.getColections
  // }

  // onSubmit={this.onSubmit}
  render() {
    return (
      <div className="App">
        <Searchbar title={'Search'} onSubmit={this.handleSubmit} />

        <ImageGallery nameImages={this.state.searchNameImages} />
        
        {/* {this.state.colectionImages && (<div><p>qwe</p></div> 
        )} */}
        <ToastContainer autoClose={3000} />
        
      </div>
      // const ({ searchNameImage }) = this.state

    // {
    //   this.state.colectionImages && (
    //     <div><p>qwe</p></div> 
    //   )}
      
        // <ImageGallery colections={this.state.SearchNameImage} />
    

      // {/* <Loader/> 
      
      // <Button/>

      // <Modal /> */}
    )
  }
}
