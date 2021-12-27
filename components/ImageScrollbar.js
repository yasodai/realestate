import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import useSwipe from './../utils/useSwipe';
import { clamp } from 'ramda';


function ImageScrollbar({ photos }) {
  const [focus, setFocus] = useState(0)
  const { direction, onPressStart, onPressEnd } = useSwipe()

  useEffect(() => {
    setFocus((focus) => clamp(0, photos.length - 1, direction + focus));
  }, [direction]);
  return (
    <div
      className="overflow-hidden"
      onMouseDown={onPressStart}
      onMouseUp={onPressEnd}
      onTouchStart={onPressStart}
      onTouchEnd={onPressEnd}
    >

      <ul
        className="flex  snap-x snap-mandatory transform duration-300"
        style={{ '--tw-translate-x': `${focus * -100}%` }}
      >
        {photos.map(photo => (
          <li key={photo.id} className="min-w-full snap-center">
            <Image
              className='object-cover object-center'
              placeholder='blur'
              blurDataURL={photo.url}
              src={photo.url}
              alt='property'
              width={1000}
              height={500}
              layout='responsive'
              draggable={false}
            />
          </li>
        ))}

      </ul>
      <nav className="flex justify-center gap-2 py-4 ">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            className={`bg-sky-600 w-3 h-3 rounded-full ${index === focus || 'scale-90 opacity-50'}`}
            onClick={() => setFocus(index)}
          ></button>
        ))}
      </nav>

    </div>
  )
}

export default ImageScrollbar
