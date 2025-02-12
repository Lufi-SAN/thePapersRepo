import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
export default function Card({ category = null, title = null, price = null, image = null, classNames, style = null}) {
    return (
        <div className={`${classNames.mainDiv}`} style={style}>
            {/* <div className={classNames.pictureDiv} style={{ backgroundImage: `url(${classNames.picture})` }}></div> */}
            <p className={`${classNames.mobileText} lg:hidden`}>{title}</p>
            <div className={`${classNames.blendDiv}`} ><div className={classNames.pictureDiv}><img src={image} alt="Product image" className={classNames.picture} /></div></div>
            <p className={`hidden lg:block ${classNames.firstP}`} >{category}</p>
            <p className={`hidden lg:block ${classNames.secondP}`}>{title}</p>
            <p className={`hidden lg:block ${classNames.thirdP}`}>{price}</p>   
        </div>
    )
}

Card.propTypes = {
    category: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    classNames: PropTypes.object,
    style: PropTypes.object
}
