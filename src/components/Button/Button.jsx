import React from 'react';
import PropTypes from 'prop-types';

const Button = ({onClickFunc, holderText = "Button", nameOfClass, typeOfButton = "button", dataId}) => {
  if (dataId) {
    return (
      <button className={nameOfClass} type={typeOfButton} onClick={onClickFunc} data-id={dataId}>
        {holderText}
      </button>
    );
  } else {
    return (
      <button className={nameOfClass} type={typeOfButton} onClick={onClickFunc}>
        {holderText}
      </button>
    )
  };
};

Button.propTypes = {
  onClickFunc: PropTypes.func,
  holderText: PropTypes.string,
  typeOfButton: PropTypes.string,
  nameOfClass: PropTypes.string,
};

export default Button;
