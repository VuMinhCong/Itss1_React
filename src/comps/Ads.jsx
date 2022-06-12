import { useEffect, useState } from 'react';

const imgUrls = [
  'https://images7.alphacoders.com/110/thumbbig-1105631.webp',
  'https://images5.alphacoders.com/109/thumbbig-1099191.webp',
  'https://images8.alphacoders.com/112/thumbbig-1129503.webp',
];
const Ads = ({ className }) => {
  const [url, setUrl] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setUrl(url === imgUrls.length - 1 ? 0 : url + 1);
    }, 3000);
  }, [url]);

  return (
    <div className={'ads ' + className}>
      <img src={imgUrls[url]}></img>
    </div>
  );
};

export default Ads;
