/* eslint-disable jsx-a11y/alt-text */
import { useEffect , useState } from 'react';
import './App.css'
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

function App() {

  interface Values {
    artist: string;
  }

  const SignupSchema = Yup.object().shape({
    artist: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  const [artist, setArtist] = useState();
  const [albums, setAlbums] = useState(Array<{ }>); 
  const [areInfo, setareInfo] = useState(false);

  return (
    <div className="App container mt-3 badge bg-secondary">

      {/* ----------------------- HEADER ----------------------------------- */}
      <header className="App-header p-5 text-white">
            <h1 className='fw-bold' > Houlak - Challenge </h1>
            <p className='fs-6 pt-3'> This is applicaction that connect with the api of Spotify and you can have information about your favorites artists.</p>
      </header>

      {/* --------------------------- FORM ------------------------- */}

      <div>
      <h3 className='fw-bold'> Spotify API </h3>
      <p className='mt-3'>
        With this API You can see the discography about your favorites artists
      </p>
      <Formik
        initialValues={ { artist: ''} }
        validationSchema ={ SignupSchema }
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          const { artist } = values;
          
          fetch('http://localhost:8888/api/v1/getAlbums/2AZOALDIBORfbzKTuliwdJ/10')
          .then( resp => resp.json()) 
          .then( data => {

              console.log(data.items);
              // setAlbums( (p) => [..p, {data.items}]);
              console.log(albums);
              setareInfo(true);
          })
          .catch( e => console.log(e));

          alert( JSON.stringify(values, null , 2) );
          setSubmitting(false);
        }}
      >
      { ( { errors, touched } ) => (
         <Form className=''>
          
         <div className='pt-3'>
           <Field className='p-2 rounded artistField' 
                  id="firstName" 
                  name="artist" 
                  placeholder="Insert your favorite Artist" 
            />
           { errors.artist && touched.artist ? 
               <div className='text-danger pt-2 pb-4'>{errors.artist}</div> 
             : 
               null
           }
         </div>

         <button className='btn btn-success mt-3' type="submit">Search</button>
       </Form>
      )}
      
      </Formik>
    </div>


    {/* --------------------------- ARTISTA ------------------------- */}
          

    <div className='mt-5'>
          <h3> Lista </h3>
          {
            areInfo && albums.map( (disc: any) => {
              return(
                <div>
                  <img src={ disc[0].url } height={ disc[0].height} width={disc[0].width} />
                  <p>{ disc.name}</p>
                  <p>{ disc.release_date }</p>
                  <p>{ disc.type }</p>
                </div>
              )
            })
          }
    </div>

    {/* --------------------------- FOOTER ------------------------- */}
    <footer className='pb-3 pt-5'> 
      <div className='badge bg-dark bg-secondary'>
        <span className='p-1 text-uppercase'> developed by <span className='fw-bold text-light'>bruno daniel bonino</span> </span> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" height='1rem' width='1rem' >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    </footer>

    </div>
  );
}

export default App;
