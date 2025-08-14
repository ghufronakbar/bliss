"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  Bed,
  Bath,
  Square,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Building2Icon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useProperty } from "@/service/property";
import { convertToIDR } from "@/helper/formatter";
import { useData } from "@/service/data";
import { PLACEHOLDER_IMAGE } from "@/constants";

interface ProductDetailsClientProps {
  id: string;
}
export default function ProductDetailsClient({
  id,
}: ProductDetailsClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useProperty(id);
  const { data: rootData } = useData();

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollDistance = window.innerWidth >= 768 ? -400 : -300;
      scrollContainerRef.current.scrollBy({
        left: scrollDistance,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollDistance = window.innerWidth >= 768 ? 400 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollDistance,
        behavior: "smooth",
      });
    }
  };

  if (isLoading || !rootData) return null;

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200 pt-16 lg:pt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
              <Link
                href="/"
                className="flex items-center space-x-1 hover:text-primary-600"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Beranda</span>
              </Link>
              <span>/</span>
              <span className="text-gray-900">Detail Properti</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] gap-4">
          <Building2Icon className="w-40 h-40 text-red-500 animate-pulse" />
          <h1 className="text-2xl font-bold">Properti tidak ditemukan</h1>
          <p className="text-gray-500">
            Mohon maaf, properti yang Anda cari tidak ditemukan.
          </p>
          <Button variant="outline" className="mt-4">
            <Link href="/property">Kembali ke Properti</Link>
          </Button>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 pt-16 lg:pt-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
            <Link
              href="/"
              className="flex items-center space-x-1 hover:text-primary-600"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Beranda</span>
            </Link>
            <span>/</span>
            <span className="text-gray-900">Detail Properti</span>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left Column - Images */}
          <div className="space-y-3 sm:space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-lg">
              <Image
                src={data?.images[selectedImage] || PLACEHOLDER_IMAGE}
                alt={`${data?.name} - Image ${selectedImage + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-full bg-white/90 hover:bg-white"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                    }`}
                  />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-full bg-white/90 hover:bg-white"
                >
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                </Button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {data?.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-primary-600 ring-2 ring-primary-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${data?.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-4 sm:space-y-6">
            {/* Category & Title */}
            <div>
              <Badge variant="secondary" className="mb-2 text-xs sm:text-sm">
                Properti Mewah
              </Badge>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {data?.name}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 flex items-center">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary-600 flex-shrink-0" />
                <span className="line-clamp-2">{data?.address}</span>
              </p>
            </div>

            {/* Price and Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-600">
                {convertToIDR(data?.price || 0)}
              </div>
              <Badge
                variant={data?.isAvailable ? "default" : "secondary"}
                className={`text-xs sm:text-sm px-3 py-1 ${
                  data?.isAvailable
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-orange-600 hover:bg-orange-700 text-white"
                }`}
              >
                {data?.isAvailable ? "Tersedia" : "Tidak Tersedia"}
              </Badge>
            </div>

            {/* Delivery Info */}
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 bg-primary-50 p-3 rounded-lg">
              <Clock className="h-4 w-4 text-primary-600 flex-shrink-0" />
              <span>
                {data?.isAvailable
                  ? "Segera pesan untuk mendapatkan properti ini"
                  : "Properti sedang tidak"}
              </span>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 py-4 border-y border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 text-center sm:text-left">
                <Square className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 mx-auto sm:mx-0" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Luas</p>
                  <p className="text-sm sm:text-base font-semibold">
                    {data?.sqft} m²
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 text-center sm:text-left">
                <Bed className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 mx-auto sm:mx-0" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Kamar</p>
                  <p className="text-sm sm:text-base font-semibold">
                    {data?.room}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 text-center sm:text-left">
                <Bath className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 mx-auto sm:mx-0" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Kamar Mandi
                  </p>
                  <p className="text-sm sm:text-base font-semibold">
                    {data?.bath}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="w-full sm:flex-1 bg-primary-600 hover:bg-primary-700 text-white text-sm sm:text-base"
              >
                Hubungi Agen
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-6 sm:px-8 text-sm sm:text-base border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-200"
                onClick={() => {
                  // Open PDF in new tab
                  window.open("/catalog.pdf", "_blank");
                }}
              >
                Lihat Katalog Lengkap
              </Button>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3">
                  Deskripsi & Fitur
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                  {data?.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {data?.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Properties */}
        <div className="mt-12 sm:mt-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-3 sm:space-y-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center sm:text-left">
              Properti Terkait
            </h2>
            {/* Navigation arrows - visible on medium screens and up */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={scrollLeft}
                className="h-10 w-10 p-0 rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={scrollRight}
                className="h-10 w-10 p-0 rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Horizontal scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {rootData?.properties
              .filter((prop) => prop.id !== id && prop.type === data?.type)
              .map((prop) => (
                <motion.div
                  key={prop.id}
                  whileHover={{ y: -4 }}
                  className="group cursor-pointer flex-shrink-0"
                  style={{ minWidth: "260px", maxWidth: "300px" }}
                >
                  <Card className="overflow-hidden w-full">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={prop.images[0] || PLACEHOLDER_IMAGE}
                        alt={prop.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                        <Badge
                          variant="secondary"
                          className={`text-xs sm:text-sm ${
                            prop.isAvailable
                              ? "bg-green-600 text-white"
                              : "bg-orange-600 text-white"
                          }`}
                        >
                          {prop.isAvailable ? "Tersedia" : "Tidak Tersedia"}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 text-sm sm:text-base">
                        {prop.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2 flex items-center">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-primary-600 flex-shrink-0" />
                        <span className="line-clamp-1">{prop.address}</span>
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Bed className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600" />
                            <span>{prop.room}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Bath className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600" />
                            <span>{prop.bath}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Square className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600" />
                            <span>{prop.sqft}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs sm:text-sm font-medium">
                            {prop.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-base sm:text-lg font-bold text-primary-600">
                        {convertToIDR(prop.price)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
