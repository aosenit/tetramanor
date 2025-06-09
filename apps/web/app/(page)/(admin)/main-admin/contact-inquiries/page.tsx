import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function ContactPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600">
        Admin / <span className="text-green-600 font-medium">Contact page</span> / Edit
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Contact information</h1>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Company Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Company Email</Label>
          <Input id="email" defaultValue="Contact@tetramanor.com" className="bg-gray-100" />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" defaultValue="+ 234 7890666654" className="bg-gray-100" />
        </div>

        {/* WhatsApp Number */}
        <div className="space-y-2">
          <Label htmlFor="whatsapp">Whatsapp number</Label>
          <Input id="whatsapp" defaultValue="+ 234 7890666654" className="bg-gray-100" />
        </div>

        {/* Social Media */}
        <Collapsible>
          <CollapsibleTrigger className="flex items-center gap-2 text-left">
            <span className="font-medium">Social media</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="space-y-4 pl-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" placeholder="Facebook URL" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input id="twitter" placeholder="Twitter URL" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" placeholder="Instagram URL" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" placeholder="LinkedIn URL" />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Map Location */}
        <div className="space-y-4">
          <Label>Map location</Label>
          <RadioGroup defaultValue="address" className="flex gap-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="embed" id="embed" />
              <Label htmlFor="embed">Use embed code</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="address" id="address" />
              <Label htmlFor="address">Use address</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Office Address */}
        <div className="space-y-2">
          <Label htmlFor="office-address">Office address</Label>
          <Input id="office-address" defaultValue="+ 234 7890666654" className="bg-gray-100" />
        </div>

        {/* Map Preview */}
        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Map preview</span>
        </div>

        {/* Agent Inquiry Section */}
        <div className="pt-6">
          <h2 className="text-lg font-semibold text-green-600 mb-4">Become an agent inquiry</h2>
          {/* Add agent inquiry form fields here */}
        </div>
      </div>
    </div>
  )
}
