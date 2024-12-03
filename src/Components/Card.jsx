import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
export default function Card({ category, title, price, image, classNames }) {
    return (
        <Link to={'/cart'}>
        <div className={classNames.mainDiv}>
            {/* <div className={classNames.pictureDiv} style={{ backgroundImage: `url(${classNames.picture})` }}></div> */}
            <div className={classNames.blendDiv} ><div className={classNames.pictureDiv}><img src={image} alt="Product image" className={classNames.picture} /></div></div>
            <p className={classNames.firstP} >{category}</p>
            <p className={classNames.secondP}>{title}</p>
            <p className={classNames.thirdP}>{price}</p>   
        </div>
        </Link>
    )
}

Card.propTypes = {
    category: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    classNames: PropTypes.object
}
