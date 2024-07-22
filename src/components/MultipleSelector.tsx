import React from 'react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';

const OPTIONS: Option[] = [
  { label: 'Swimming', value: 'swimming' },
  { label: 'Cricket', value: 'cricket' },
  { label: 'Gaming', value: 'gaming' },
  { label: 'Reading', value: 'reading' },
  { label: 'Cooking', value: 'cooking' },
  { label: 'Traveling', value: 'traveling' },
  { label: 'Photography', value: 'photography' },
  { label: 'Painting', value: 'painting', disable: true },
  { label: 'Writing', value: 'writing', disable: true },
  { label: 'Music', value: 'music' },
];

const MultipleSelectorDemo = () => {
  return (
    <div className="w-full px-10">
      <MultipleSelector
        defaultOptions={OPTIONS}
        placeholder="Select Your Interests..."
        emptyIndicator={
          <p className="text-center text-lg leading-10">
            No results found.
          </p>
        }
      />
    </div>
  );
};

export default MultipleSelectorDemo;

