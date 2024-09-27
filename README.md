# next-intl-shadcn-form

This package provides utilities for translating error messages from Shadcn forms using next-intl.

## Installation

```bash
npm install next-intl-shadcn-form
```

## Usage

In your schema, you can use the `serializeTranslationCall` or `stc` (which is the same) function to serialize the translation call. This will allow you to pass the translation key and values to the client, where you can deserialize it back to a translation call and execute it.

```typescript
import { z } from "zod";
import {
  stc, // or `serializeTranslationCall`
} from "next-intl-shadcn-form";

export const SignUpFormSchema = z.object({
  display_name: z
    .string()
    .min(4, stc("min", { number: 4 }))
    .max(24, stc("max", { number: 24 })),
  email: z.string().email(stc("invalid_email")),
  password: z
    .string()
    .min(8, stc("min", { number: 8 }))
    .max(255, stc("max", { number: 255 })),
});
```

This how my `en.json` of next-intl setup looks like:

```json
{
  "Validation": {
    "min": "Must be at least {number} characters",
    "max": "Must be at most {number} characters",
    "invalid_email": "Invalid email address"
  }
}
```

Then, in your form(FormMessage) component, you can use the `deserializeTranslationCall` or `dtc` function to deserialize the serialized translation call and execute it.
You can do something like this:

```typescript
import { useTranslations } from "next-intl";
import {
  deserializeTranslationCall,
  isSerializedTranslationCall,
} from "next-intl-shadcn-form";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const t = useTranslations("Validation");
  const { error, formMessageId } = useFormField();

  let translatedMessage;
  try {
    const message = error?.message || "";
    const isSerialized = isSerializedTranslationCall(message);
    if (isSerialized) {
      translatedMessage = deserializeTranslationCall(message, t);
    }
  } catch (e) {
    translatedMessage = error?.message || children;
  }
  const body = translatedMessage;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn(
        "text-sm font-medium text-red-500 dark:text-red-900",
        className
      )}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";
```

now your error messages will be translated automatically. 👻

## API

### `serializeTranslationCall(key: string, values?: TranslationValues): string`

### `stc(key: string, values?: TranslationValues): string`

Serializes a translation call to a string.

### `deserializeTranslationCall(serialized: string, t: NextIntlTranslationFunction): string`

### `dtc(serialized: string, t: NextIntlTranslationFunction): string`

Deserializes a string back to a translation call and executes it.

### `isSerializedTranslationCall(str: string): boolean`

Checks if a string is a valid serialized translation call.

## License

MIT
