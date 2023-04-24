
const BASE_URL = `https://api.pexels.com/v1/`
import { createClient } from 'pexels';

const client = createClient('Uj6fngt1lj4ym1Drj4PAxu5eLUOhSgR0BuZ56YaB2Ctt6xQcMdmHH4M7');
export async function getList(page = 1,place) {
  const settings = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:'Uj6fngt1lj4ym1Drj4PAxu5eLUOhSgR0BuZ56YaB2Ctt6xQcMdmHH4M7'
    }
};
try {
  const response = await fetch(`https://api.pexels.com/v1/search?query=${place}&page=${page}`,settings)
  

  const a = await response.json()
  // console.log('status',a)
  const photos=a.photos
  // console.log('where is the error',photos)
  return photos
} catch (e) {return e}

}

export function formatPhotoUri(id, width, height) {

  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&h=${Math.floor(height)}&w=${Math.floor(width)}&size=small`
 
}

