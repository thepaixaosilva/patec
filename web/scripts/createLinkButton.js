// scripts/createLinkButton.js
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const template = `"use client"
import type { HTMLChakraProps, RecipeProps } from "@chakra-ui/react"
import { createRecipeContext } from "@chakra-ui/react"
import Link from "next/link"
import { ComponentProps } from "react"

export interface LinkButtonProps
  extends HTMLChakraProps<typeof Link, RecipeProps<"button">> {}

const { withContext } = createRecipeContext({ key: "button" })

export const LinkButton = withContext<ComponentProps<typeof Link>, LinkButtonProps>(Link)
`;

const componentsDir = join(process.cwd(), 'src', 'components', 'ui');

// Cria o diretório se não existir
if (!existsSync(componentsDir)) {
  mkdirSync(componentsDir, { recursive: true });
}

// Escreve o arquivo
writeFileSync(join(componentsDir, 'link-button.tsx'), template);

console.log('✅ Post-installation completed successfully!');