# next-intl-shadcn-form

This package provides utilities for translating error messages from Shadcn forms using next-intl.

## Installation

```bash
npm install next-intl-shadcn-form
```

## Usage

```typescript
import { z } from "zod";
import {
  serializeTranslationCall,
  deserializeTranslationCall,
} from "next-intl-shadcn-form";

export const userStepOneSignUpFormSchema = z.object({
  display_name: z
    .string()
    .min(4, serializeTranslationCall("min", { number: 4 }))
    .max(24, serializeTranslationCall("max", { number: 24 })),
  email: z.string().email(serializeTranslationCall("invalid_email")),
  password: z
    .string()
    .min(8, serializeTranslationCall("min", { number: 8 }))
    .max(255, serializeTranslationCall("max", { number: 255 })),
});

// In your shadc form (FormMessage) component
import { useTranslations } from "next-intl";
import {
  serializeTranslationCall,
  deserializeTranslationCall,
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

## API

### `serializeTranslationCall(key: string, values?: TranslationValues): string`

Serializes a translation call to a string.

### `deserializeTranslationCall(serialized: string, t: NextIntlTranslationFunction): string`

Deserializes a string back to a translation call and executes it.

### `isSerializedTranslationCall(str: string): boolean`

Checks if a string is a valid serialized translation call.

## License

MIT
