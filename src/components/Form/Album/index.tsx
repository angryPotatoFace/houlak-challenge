import moment from "moment";

function Album( props: any ) {
    return ( 
        <div > 
            <h3 className='fw-bold pb-3'> Discography </h3>
            <div className='albums' > 
                <div className='d-flex flex-column bd-highlight mb-3 justify-content-center '>

                    <div className='p-2 pt-4'>
                        <a className='text' href={ props.data.external_urls.spotify } target='_blank' rel="noreferrer" >
                            <img 
                                className='container' 
                                src={ props.data.images[0].url } 
                                alt={`album-${ props.data.name }`}
                            />
                        </a>
                    </div>

                    <div className='p-2 container text-wrap'>
                        <h5 className='fw-bold responsive-font-example' >{ props.data.name}</h5>
                        <p className='album-description'>
                            <span className='text-capitalize'> { props.data.type } </span>
                                •
                            <span className='text-capitalize' >  { moment( props.data.release_date ).format(" MMMM YYYY ")  } </span>
                                •
                            <span className='text-capitalize'> { props.data.total_tracks } Tracks </span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
     );
}

export default Album;