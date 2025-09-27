"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import supabase from "@/utils/supabase";

interface Course {
  id: string;
  code: string;
}

export function CourseCombobox({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Course[]>([]);

  useEffect(() => {
    if (!search) {
      setResults([]);
      return;
    }

    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, code")
        .ilike("code", `%${search}%`)
        .limit(10);

      if (!error && data) {
        setResults(data);
      }
    };

    fetchCourses();
  }, [search]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground"
          )}
        >
          {value || "Search for a course"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Type to search..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandGroup>
            {results.map((c) => (
              <CommandItem
                key={c.id}
                onSelect={() => {
                  onChange(c.code);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === c.code ? "opacity-100" : "opacity-0"
                  )}
                />
                {c.code}
              </CommandItem>
            ))}
            {results.length === 0 && search && (
              <p className="p-2 text-sm text-muted-foreground">
                No results found
              </p>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
