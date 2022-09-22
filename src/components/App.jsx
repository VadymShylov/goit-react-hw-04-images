import { useState, useEffect } from 'react';
import { fetchApi } from 'Services/apiService';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import s from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal/Modal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState([]);
  const [dataLargeImage, setDataLargeImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (searchQuery === '') return;

    setIsLoading(true);
    
    fetchApi(searchQuery, page)
      .then(data => {
        setSearchData(prev => [...prev, ...data.hits]);
      })
      .catch(err => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [searchQuery, page]);

  const onSubmitNewSearch = newText => {
    setSearchQuery(newText);
    setPage(1);
    setSearchData([]);
    setIsError(false);
  };

  const onLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const onHandleClickImage = data => {
    setDataLargeImage(data);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };
  
  return (
    <div className={s.App}>
      <Searchbar onSubmit={onSubmitNewSearch} />
      <ImageGallery
        searchData={searchData}
        onHandleClickImage={onHandleClickImage}
      />
      {searchData.length !== 0 && <Button onLoadMore={onLoadMore} />}
      {isLoading && <Loader />}
      {isError &&
        toast.error('Sorry, there are no images matching your search query.')}
      <ToastContainer autoClose={5000} />
      {isModalOpen && (
        <Modal dataLargeImage={dataLargeImage} toggleModal={toggleModal} />
      )}
    </div>
  );
}