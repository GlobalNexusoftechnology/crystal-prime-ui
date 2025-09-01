import React, { useState } from "react";
import Image from "next/image";

export interface ITicketEstimateProps {
    ticketEstimateData: { 
        image_url: string | null;
    }
}

export function TicketEstimate({ ticketEstimateData }: ITicketEstimateProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setIsImageModalOpen(true);
    };

    const handleCloseImageModal = () => {
        setIsImageModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div className="border-b p-4 2xl:p-[1vw]">
            <h3 className="text-[1.2rem] 2xl:text-[1.2vw] mb-4 2xl:mb-[1vw]">Ticket Attachments</h3>
            <div className="flex flex-col gap-8 2xl:gap-[2vw] text-[0.9rem] 2xl:text-[0.875vw]">
                <div className="flex flex-wrap gap-12 2xl:gap-[3vw] items-start">
                    <div className="flex flex-col">
                        <p className="font-light">Attached Image</p>
                        {ticketEstimateData.image_url ? (
                            <div className="mt-2">
                                <Image
                                    src={ticketEstimateData.image_url}
                                    alt="Ticket attachment"
                                    width={200}
                                    height={150}
                                    className="w-48 h-36 object-cover rounded border cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => handleImageClick(ticketEstimateData.image_url!)}
                                />
                            </div>
                        ) : (
                            <p className="text-[1rem] 2xl:text-[1.1vw] text-gray-500">No image attached</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {isImageModalOpen && selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={handleCloseImageModal}
                >
                    <div
                        className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute top-4 right-4 z-10">
                            <button
                                onClick={handleCloseImageModal}
                                className="bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-all"
                            >
                                ×
                            </button>
                        </div>
                        <div className="relative w-full h-full">
                            <Image
                                src={selectedImage}
                                alt="Ticket attachment"
                                width={800}
                                height={600}
                                className="w-full h-auto max-h-[90vh] object-contain"
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
