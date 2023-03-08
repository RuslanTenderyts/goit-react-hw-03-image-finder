import { Component } from "react";
import { Toaster } from 'react-hot-toast';
import { Loader } from "./Loader/Loader";
import { fetchImagesWithQuery } from "service/api";

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ButtonLoadMore } from './Button/Button'


export default class App extends Component {
  state = {
    images: [],
    search: '',
    page: 1,
    totalHits: 0,
    disableBtn: false,
    isLoading: false,
    error: null,
  }

  async componentDidUpdate(_, prevState) {
    const {search, page, disableBtn, totalHits, images} = this.state;
    
    if(prevState.search !== search){
      this.setState({ images: [], page: 1, });
    }

    if(prevState.search !== search || prevState.page !== page) {
      this.setState({ isLoading: true, error: null, disableBtn: false,});
      this.getFetch( search, page );
    }

    if ( images.length !== 0 && !disableBtn && (totalHits / 12 > page)  ) {
      this.setState({ disableBtn: true });
    } 
  }

   getFetch = async ( search, page ) => {
    try {
      const data = await fetchImagesWithQuery( search, page );
      this.setState(({images}) => ({ images: [...images, ...data.hits], totalHits: data.totalHits, }));
      
      } catch (error) {
      console.log(error)
      this.setState({ error });

      } finally {
      this.setState({ isLoading: false });
    }
  }
 
  handleFormSubmit = (value) => {
    this.setState({ search: value })
    console.log(value)
  }
  handleMoreImage = () => {
    this.setState(({page}) => ({
      page: page + 1
    }))
  }
  render() {
    const { images, isLoading, error, disableBtn } = this.state;

    return (
      <>   
        <Toaster toastOptions={{ duration: 500}} />
        <Searchbar onSubmit={this.handleFormSubmit}/>

        {error && <p>{error.message}</p>}

        {isLoading && <Loader/>}

        {images.length > 0 && <ImageGallery onClick={this.onClickImage} images={images} />}

        {disableBtn && <ButtonLoadMore onClick={this.handleMoreImage} ></ButtonLoadMore> }
        

        

      </>
    );
  }
};

