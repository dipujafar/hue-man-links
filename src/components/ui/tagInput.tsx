import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export interface TagInputRef {
  focus: () => void;
}

export const TagInput = forwardRef<TagInputRef, TagInputProps>(
  ({ value = [], onChange }, ref) => {
    // Default value is an empty array
    const [inputValue, setInputValue] = useState("");

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue) {
        e.preventDefault();
        if (!value.includes(inputValue)) {
          onChange([...value, inputValue]);
        }
        setInputValue("");
      } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
        onChange(value.slice(0, -1));
      }
    };

    const removeTag = (tag: string) => {
      onChange(value.filter((t) => t !== tag));
    };

    return (
      <div className="flex flex-wrap items-center">
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          required={value.length === 0 ? true : false}
          onKeyDown={handleInputKeyDown}
          className="w-full py-5 bg-primary-light-gray"
          placeholder="Type and press Enter"
        />
        {value?.map((tag) => (
          <span
            key={tag}
            className="flex items-center bg-purple-100 rounded-full px-2 py-1 m-1"
          >
            {tag}
            <Button
              variant="ghost"
              size="sm"
              className="ml-1 h-4 w-4 p-0 hover:bg-gray-300 rounded-full"
              onClick={() => removeTag(tag)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {tag}</span>
            </Button>
          </span>
        ))}
      </div>
    );
  }
);

TagInput.displayName = "TagInput";
