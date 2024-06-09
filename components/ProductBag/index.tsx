import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ProductBag() {
  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button variant="outline">Open Bag</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Your Bag</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <img
                src="/placeholder.svg"
                alt="Product Image"
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <div className="grid flex-1 gap-1">
                <div className="font-medium">Cozy Blanket</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  Quantity: 1
                </div>
                <div className="font-medium">$29.99</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/placeholder.svg"
                alt="Product Image"
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <div className="grid flex-1 gap-1">
                <div className="font-medium">Autumn Mug</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  Quantity: 2
                </div>
                <div className="font-medium">$12.99</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <div className="font-medium">Total</div>
            <div className="font-medium">$55.97</div>
          </div>
        </div>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" className="flex-1">
            Continue Shopping
          </Button>
          <Button className="flex-1">Checkout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
