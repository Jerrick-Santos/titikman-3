import banner_img from '../assets/homedisplay.png';

const Banner = () => {
    return(
        <div className='row mt-4'>
            <img className="homedisplay" src={banner_img} alt='titikman-banner'/>
        </div>
    );

}

export default Banner