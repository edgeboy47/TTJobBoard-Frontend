import React from 'react'
import { Job } from "../utils/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Button
} from "@/components/ui/button"
import { MapPin, Paperclip } from 'lucide-react';
import { timestampToRelativeTime } from '@/lib/utils';

const JobCard = (props: Job) => {
  const { img, title, company, description, location, url, createdAt } = props;
  const companyInitials = company.split(' ').slice(0, 2).map(a => a[0]).join('').toUpperCase()
  const dateString = timestampToRelativeTime(createdAt)
  const applyNow = 'Apply Now'

  return (
    <Card className="flex flex-col md:flex-row max-w-[960px] hover:-translate-y-2 transition-transform duration-250 ease-in-out my-4 shadow">
      <CardHeader className='mr-4'>
        {
          img ?
            <img src={img} alt={`${company} Logo`} className='min-w-16 min-h-16 max-w-16 max-h-16 rounded-md border-gray-300 border-2 object-contain' /> :
            company ?
              <h2 className='text-2xl md:text-3xl font-medium rounded-md bg-gray-300 min-w-16 min-h-16 max-w-16 max-h-16 text-center content-center'>{companyInitials}</h2> :
              null
        }
      </CardHeader>
      <CardContent className='flex-1'>
        <CardTitle className='flex flex-col sm:flex-row justify-between mb-2'>
          <a
            href={url}
            className='hover:text-red-700 focus-within:text-red-700 transition-colors duration-200 ease-in-out'
          >
            <h2 className="text-xl font-semibold max-w-[55ch]">{title}</h2>
          </a>
          <p className='text-sm text-gray-500 mt-1 sm:mt-0'>{dateString}</p>
        </CardTitle>
        <div className='flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 mb-4'>
          {
            company &&
            <p className="font-medium text-gray-700">{company}</p>
          }
          {
            location && company &&
            <span className="hidden sm:inline text-gray-300">•</span>
          }
          {
            location && (
              <>
                <p className='flex items-center gap-1 text-gray-500'>
                  <MapPin size={16} className='opacity-70' />
                  {location}
                </p>
              </>
            )
          }
        </div>
        <CardDescription className='mb-4'>
          <p className="max-w-prose line-clamp-2 text-sm leading-relaxed text-gray-700">{description}</p>
        </CardDescription>
        <CardFooter className='px-0'>
          <Button
            asChild
            className='w-full sm:w-auto bg-red-700 hover:bg-red-800 focus-within:bg-red-800 transition-colors duration-200 ease-in-out text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center'
          >
            <a
              href={url}
            >
              <Paperclip size={16} />
              {applyNow}
            </a>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}

export default JobCard;
