import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { ChevronDown, ChevronUp } from 'lucide-react'

const fitlerData = [
  {
    fitlerType: "Location",
    array: [
      "Bengaluru (Bangalore)", "Hyderabad", "Pune", "Chennai", "Mumbai", "Gurugram",
      "Noida", "Delhi", "Kolkata", "Ahmedabad", "Jaipur", "Chandigarh", "Indore",
      "Kochi", "Trivandrum", "Visakhapatnam", "Nagpur", "Coimbatore", "Bhubaneswar",
      "Lucknow", "Remote"
    ]
  },
  {
    fitlerType: "Industry",
    array: [
      "Software Development / Engineering", "Web Development", "Mobile App Development",
      "Data Science / Analytics", "UI/UX Design", "Digital Marketing", "Content Writing",
      "Human Resources (HR)", "Finance / Accounting", "Business Development",
      "Graphic Design", "Product Management", "Cloud / DevOps", "Cybersecurity",
      "Mechanical / Core Engineering", "Electronics / Embedded Systems",
      "Operations / Supply Chain", "Sales & Marketing", "Customer Support",
      "Education / Online Tutoring"
    ]
  },
  {
    fitlerType: "Salary",
    array: [
      "Unpaid", "₹1,000 – ₹5,000 /month", "₹5,000 – ₹10,000 /month",
      "₹10,000 – ₹20,000 /month", "₹20,000 – ₹30,000 /month", "₹30,000+ /month"
    ]
  },
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const [openSections, setOpenSections] = useState({})
  const dispatch = useDispatch()

  const changeHandler = (value) => {
    setSelectedValue(value)
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue])

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3 mb-3' />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          fitlerData.map((data, index) => (
            <div key={index} className="mb-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection(data.fitlerType)}
              >
                <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                {openSections[data.fitlerType] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {openSections[data.fitlerType] && (
                <div className="mt-2">
                  {
                    data.array.map((item, idx) => {
                      const itemId = `id${index}-${idx}`
                      return (
                        <div className='flex items-center space-x-2 my-2' key={itemId}>
                          <RadioGroupItem value={item} id={itemId} />
                          <Label htmlFor={itemId}>{item}</Label>
                        </div>
                      )
                    })
                  }
                </div>
              )}
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard
