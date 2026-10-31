export type Property = { id: string; title: string; location: string; price: string; type: 'For Sale' | 'For Rent'; area: string; beds: number; baths: number; image: string; featured?: boolean }

export const properties: Property[] = [
  { id: 'RV-2048', title: 'Sunlit Garden Residence', location: 'DHA Phase 6, Lahore', price: 'PKR 4.85 Cr', type: 'For Sale', area: '2,400 Sq. Ft.', beds: 4, baths: 4, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85', featured: true },
  { id: 'RV-2039', title: 'The Palmview Apartment', location: 'Gulberg III, Lahore', price: 'PKR 1.85 Lac/mo', type: 'For Rent', area: '1,650 Sq. Ft.', beds: 3, baths: 3, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85' },
  { id: 'RV-2021', title: 'Quiet Courtyard Villa', location: 'Bahria Town, Lahore', price: 'PKR 7.25 Cr', type: 'For Sale', area: '1 Kanal', beds: 5, baths: 6, image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85' },
  { id: 'RV-1998', title: 'Modern Commerce Heights', location: 'MM Alam Road, Lahore', price: 'PKR 3.2 Lac/mo', type: 'For Rent', area: '3,100 Sq. Ft.', beds: 0, baths: 2, image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85' },
]

export const dummyCredentials = { realtor: { phone: '0300 1234567', password: 'realtor123' }, admin: { phone: '0300 9999999', password: 'admin123' } }
