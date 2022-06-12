import { useStore } from '../../store';
import UrlItem from './urlItem';

import './index.scss';
import Filter from '../Filter/filter';
import { useEffect, useState } from 'react';

const ListUrls = ({ className }) => {
  const { urls } = useStore();

  const [option, setOption] = useState(null);
  // Contains {No, url, code, surl}

  function qualified(item) {
    let result = 1;
    if (option != null) {
      if (item.url.length) {
        result = result && item.url.includes(option.url);
      }
      if (item.code) {
        result = result && item.code.includes(option.code);
      }
    }
    return result;
  }

  const [filterList, setFilterList] = useState(urls);

  useEffect(() => {
    let new_list = urls.slice(option?.no).filter(qualified);
    setFilterList(new_list);
  }, [option, urls]);

  return (
    <div className={'list-urls ' + className}>
      <div className="list-header url-item bg-gray-400">
        <div>番号.</div>
        <div>長いURL</div>
        <div>コード</div>
        <div>短縮されたURL</div>
      </div>

      <Filter setter={setOption} />

      {filterList.length > 0 ? (
        filterList.map((u, i) => <UrlItem key={u.code} no={i + 1} url={u} />)
      ) : (
        <div className="text-5xl font-black text-gray-500 text-center mt-48">
          No data
        </div>
      )}
    </div>
  );
};

export default ListUrls;
