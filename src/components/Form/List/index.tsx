import Album from "../Album";
import { Api_Responde } from '../../../constants/form'

function ListDiscography( props: any ) {

    const List = props.albums.map( (a: Api_Responde, i:number ) => ( < Album key={ i } data={ a } /> ) )

    return ( 
        <>
            <div className='mt-5'>
            {
                props.albums.length? 
                
                List
                :
                null
            }
            {
                props.haveAlbum && <div className='alert alert-danger text-uppercase error' > no albums founded  </div>
            }
            </div> 
        </> 
    );
}

export default ListDiscography;