export async function getArtist (name: string) {

    const params: any = {
        "q": name.toLocaleLowerCase(),
        "type": "artist",
        "market": "AR",
        "limit": 1
    }

    try{  
      const resp = await fetch('http://localhost:8888/api/v1/searchArtist', {
        method: 'POST',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(params)
      })
      const data = await resp.json();
      return data.artists.items[0];
    }catch(e){
      alert(e);
      return e;
    }
}

export async function getAlbums(id: string,limit: number){
    try {
        const resp = await fetch(`http://localhost:8888/api/v1/getAlbums/${id}/${limit}`)
        const data = await resp.json();
        return data.items;
    }catch( e){
        alert(e);
        return e;
    }
}