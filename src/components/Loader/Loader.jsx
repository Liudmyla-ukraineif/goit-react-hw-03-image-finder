import { Watch } from 'react-loader-spinner';

export default function Loader() {
  return(
  <p className='loader'>
    <Watch
      height="60"
      width="60"
      radius="40"
      marginRight="16"
      color="#4fa94d"
      ariaLabel="watch-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
      Йде завантаження...</p>)
  
}
