import { useContext } from "react"
import { ContentPageContext } from "themes/boilerplate/context/ContentPageContext"

const LatestNews = () => {
  const { news } = useContext(ContentPageContext)

  if (!news || news.length === 0) return <p>There is no news to display</p>

  return (
    <div className='flex w-full flex-col items-stretch gap-2'>
      {news.map((newsItem) => (
        <div key={newsItem.id} className='card bg-base-100 shadow-xl lg:card-side'>
          <figure>
            <img src={newsItem.image?.secure_url} alt='' />
          </figure>
          <div className='card-body'>
            <h2 className='card-title'>{newsItem.title}</h2>
            <p>{newsItem.content}</p>
            <div className='card-actions justify-end'>
              <p className="w-fit font-bold text-gray-600 italic">
                {new Date(newsItem.date).toLocaleDateString("en-gb", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default LatestNews
