import React from 'react';
import classNames from 'classnames';

const FooterSocial = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-social',
    className
  );

  return (
    <div
      {...props}
      className={classes}
    >
      <ul className="list-reset">
        <li>
          <a href="https://t.me/joinchat/wBlDrLZTRn9lZDRh">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg">
              <title>Telegram</title>
              <path
                d="M8 0C3.581 0 0 3.581 0 8s3.581 8 8 8 8-3.581 8-8-3.581-8-8-8zm3.931 5.484l-1.313 6.184c-.091.441-.356.544-.725.341l-2-1.478-.959.934c-.112.109-.2.2-.4.2-.259 0-.216-.097-.303-.344L5.55 9.084l-1.978-.616c-.428-.131-.431-.425.097-.634l7.706-2.975c.35-.159.691.084.556.625z" />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default FooterSocial;