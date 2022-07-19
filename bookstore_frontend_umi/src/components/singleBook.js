import "./singleBook.css"
import {history} from 'umi';

export default function SingleBook(props) {
  return (
    <li onClick={()=>{
      let pathname;
      console.log((JSON.parse(localStorage.getItem('user'))));
      if (JSON.parse(localStorage.getItem('user')).user_type === 1)
        pathname = '/bookDetail';
      else
        pathname = '/admin/manageBook';

      history.push({
        pathname: pathname,
        state: {
          src: props.src.book_id
        }
      });

    }}>
      <div className="pro-img">
        <a href="#">
            <img src={props.src.image} alt=""/>

        </a>
      </div>
      <h3><a href="#">{props.src.name}</a></h3>
      <p className="desc">{props.src.author}</p>
      <p className="price">
        <span>{props.src.price_after}</span>元
        <del>{props.src.price_before}</del>
      </p>
      <div className="review">
        <a href="#">
          <span className="cmt">库存：{props.src.inventory} 本</span>
          <span className="cmt-id"> ISBN: {props.src.isbn}</span>
        </a>
      </div>
    </li>

  );

}
