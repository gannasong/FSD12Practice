package one.hdcola.DoctorsList.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import one.hdcola.DoctorsList.dto.DoctorDto;
import one.hdcola.DoctorsList.enitty.Doctor;
import one.hdcola.DoctorsList.exception.ResourceNotFoundException;
import one.hdcola.DoctorsList.maapper.DoctorMapper;
import one.hdcola.DoctorsList.respository.DoctorRespository;

@Service
@AllArgsConstructor
public class DoctorServiceImplt implements DoctorService {
    private DoctorRespository doctorRepository;

    @Override
    public DoctorDto createDoctor(DoctorDto doctorDto) {
        Doctor doctor = DoctorMapper.mapToEntity(doctorDto);
        Doctor saveDoctor = doctorRepository.save(doctor);
        return DoctorMapper.mapToDto(saveDoctor);
    }

    @Override
    public DoctorDto getDoctorById(Integer id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor is not exists with given id: " + id));
        return DoctorMapper.mapToDto(doctor);
    }

    @Override
    public List<DoctorDto> getAllDoctors() {
        List<Doctor> doctors = doctorRepository.findAll();
        return doctors.stream().map(DoctorMapper::mapToDto).toList();
    }

}
