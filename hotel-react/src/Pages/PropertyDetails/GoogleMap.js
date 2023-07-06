import React from 'react';

const GoogleMap = () => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <iframe title='myframe'  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.1562972869383!2d77.16873001445569!3d28.595087592526944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1da3d0e98c7b%3A0xf56c1b12e18dd9b!2sTaj%20Palace%2C%20New%20Delhi!5e0!3m2!1sen!2sbd!4v1674146090539!5m2!1sen!2sbd" allowFullscreen="" width={"1000"} height={"300"} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    );
};

//<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14012.625801399312!2d77.170919!3d28.595083!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf56c1b12e18dd9b!2sTaj%20Palace%2C%20New%20Delhi!5e0!3m2!1sen!2sbd!4v1674213185211!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

export default GoogleMap;