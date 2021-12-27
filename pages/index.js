import Image from 'next/image'
import Link from 'next/link'
import { fetchApi } from '../utils/fetchApi'
import Property from './../components/Property';
const Banner = ({ purpose, imageUrl, title1, title2, desc1, desc2, buttonText, linkName }) => (
  <div className="flex flex-col md:flex-row gap-4">
    <Image className='object-center object-cover -z-10' src={imageUrl} alt='img' width={500} height={300} />
    <div className="flex flex-col justify-center gap-2">
      <p className='text-gray-500'>{purpose}</p>
      <h1 className='text-3xl font-bold'>{title1}<br />{title2}</h1>
      <p className='text-gray-800'>{desc1}<br />{desc2}</p>
      <button className='bg-gray-100 p-2 font-semibold tracking-wide rounded w-fit'>
        <Link href={linkName}>{buttonText}</Link>
      </button>
    </div>
  </div>
)

export default function Home({ propertyForSale, propertyForRent }) {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="">
        <Banner
          purpose='RENT A HOME'
          title1='Rental Homes for'
          title2='Everyone'
          desc1=' Explore from Apartments, builder floors, villas'
          desc2='and more'
          buttonText='Explore Renting'
          linkName='/search?purpose=for-rent'
          imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
        />
      </div>
      {/* fetch properties and map over them... */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {propertyForRent.hits.map(property => <Property property={property} key={property.id} />)}
      </div>
      <Banner
        purpose='BUY A HOME'
        title1=' Find, Buy & Own Your'
        title2='Dream Home'
        desc1=' Explore from Apartments, land, builder floors,'
        desc2=' villas and more'
        buttonText='Explore Buying'
        linkName='/search?purpose=for-sale'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
      />
      {/* fetch properties and map over them... */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {propertyForSale.hits.map(property => <Property property={property} key={property.id} />)}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)
  return {
    props: {
      propertyForSale,
      propertyForRent
    }
  }
}